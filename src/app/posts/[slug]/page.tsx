import { getPosts, n2m } from "@/app/api/route"
import { Metadata } from "next"
import ReactMarkdown from "react-markdown"
import { notFound } from "next/navigation"
import Link from "next/link"

export async function generateStaticParams() {
  const posts = await getPosts()
  const slugs = posts.map((value: any) => ({
    slug: value.id,
  }))
  return slugs
}

// export const dynamicParams = false
export async function generateMetadata({
  params,
}: {
  params: { id: string; slug: string }
}): Promise<Metadata> {
  const posts = await getPosts()
  const title = posts.filter(
    (value: any) =>
      // params: { title: value.title },
      value.id === params.slug
  )[0].title
  console.log(title)
  return {
    title: `${title} | Ayami's Kitchen`,
  }
}

type Data = {
  id: string
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const posts = await getPosts()
  const data = posts.find((value) => value.id === slug)
  const content = await n2m((data as Data).id)
  if (!data) notFound()
  return (
    <>
      {/* 一覧に戻るボタン */}
      <Link
        // ref={prevRef}
        href={"../"}
        id="prev"
        className="fixed bottom-1 right-1 rounded-xl bg-[#A31C00] py-2 px-4 text-white flex gap-2 justify-center items-center transition"
        style={{ zIndex: 500 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
        一覧に戻る
      </Link>
      <div className="px-3">
        <div className="relative mt-4 max-w-3xl mx-auto">
          <div
            className="absolute w-full h-full rounded-xl top-0.5 left-0.5 bg-white shadow-notepad"
            style={{ zIndex: 300 }}
          ></div>
          <div
            className="absolute w-full h-full rounded-xl top-1 left-1 bg-white shadow-notepad"
            style={{
              backgroundImage: "url(/images/notepad-cover.webp)",
              zIndex: 200,
            }}
          ></div>
          <div
            className="absolute w-full h-full rounded-xl top-1.5 left-1.5 bg-white shadow-notepad"
            style={{
              backgroundImage: "url(/images/notepad-cover.webp)",
              zIndex: 100,
            }}
          ></div>
          <article
            className="relative kaisei-decol flex flex-col gap-2 py-2 px-4 rounded-xl shadow-notepad origin-top-right transition"
            style={{
              zIndex: 400,
            }}
          >
            <div
              className="w-full h-8 -mt-4 bg-repeat-space bg-contain"
              style={{ backgroundImage: "url(/images/notepad-head.svg)" }}
            ></div>
            <div className="py-4 md:p-12 grid gap-3">
              <p className="text-3xl md:text-5xl text-center kaisei-decol">
                {data.title}
              </p>
              <div
                className="w-full h-1.5 bg-repeat-space bg-contain"
                style={{ backgroundImage: "url(/images/title-border.svg)" }}
              ></div>
              <p className="text-right kaisei-decol">{data.date}</p>
              <div className="w-full flex gap-2 flex-wrap kaisei-decol">
                {data.tags.map((tag: string, index: number) => (
                  <span
                    key={`tag-${index}`}
                    className="text-sm bg-[#A31C00] text-white py-1 px-5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div
                className="leading-[46px] w-full bg-repeat-y notepad-detail font-sans"
                style={{ backgroundImage: "url(/images/notepad-border.svg)" }}
              >
                <ReactMarkdown>{content.parent}</ReactMarkdown>
              </div>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
