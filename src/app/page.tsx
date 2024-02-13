import { getAllTags, getPosts } from "@/app/api/route"
import { Contents } from "@/components/src/contents"

export default async function Home() {
  const posts = await getPosts()
  const allTags = await getAllTags()

  return (
    <div className="kaisei-decol max-w-5xl px-3 mx-auto">
      {/* tag area */}
      <Contents allTags={allTags} allPosts={posts} />
    </div>
  )
}
