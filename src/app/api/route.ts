import { Client } from "@notionhq/client"
import { DatabaseObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { NotionToMarkdown } from "notion-to-md"

const notion = new Client({ auth: process.env.NOTION_TOKEN })

export async function getPosts() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID || "",
  })
  const results = response.results.map((post) => {
    const data = post as DatabaseObjectResponse
    return {
      id: data.id,
      title: (data.properties.Title as any).title[0].plain_text as string,
      description: (data.properties.Description as any).rich_text[0]
        .plain_text as string,
      date: (data.properties.Date as any).date.start as string,
      slug: (data.properties.Slug as any).rich_text[0].plain_text as string,
      tags: (data.properties.Tags as any).multi_select.map(
        (tag: any) => tag.name
      ) as string[],
      properties: data.properties,
    }
  })
  // return results
  return results
}

export async function getAllTags() {
  const posts = await getPosts()
  const allTags: string[] = []
  posts.map((post) =>
    post.tags.map((tag) => !allTags.includes(tag) && allTags.push(tag))
  )
  return allTags
}

export async function n2m(slug: string) {
  const posts = await getPosts()
  const n2m = new NotionToMarkdown({ notionClient: notion })

  const mdBlocks = await n2m.pageToMarkdown(slug, 2)
  const linkBLocks: any[] = []
  const blocks: any[] = []
  mdBlocks.map((block: any) => {
    block.type === "link_to_page" &&
      ((block.parent = block.parent.replace(
        "link_to_page",
        posts.filter(
          (post) => post.id === block.parent.match(/\(([^)]+)\)/)[1]
        )[0].title
      )),
      linkBLocks.push(block))
    // block.type === "link_to_page" && linkBLocks.push(block)
    blocks.push(block)
  })

  const mdString = n2m.toMarkdownString(blocks)

  // return mdString
  return mdString
}
