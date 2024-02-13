"use client"

import {
  InputHTMLAttributes,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react"
import { Notepad } from ".."

type allPostsProps = {
  id: string
  title: string
  description: string
  date: string
  slug: string
  tags: string[]
}[]

export function Contents(props: {
  allTags: string[]
  allPosts: allPostsProps
}) {
  const { allTags, allPosts } = props
  const [tagAreaActive, setTagAreaActive] = useState(false)
  const tagAreaRef = useRef<HTMLDivElement>(null)
  const [filterPosts, setFilterPosts] = useState(allPosts)
  const [filterTags, setFilterTags] = useState(allTags)
  const tagsRef = useRef<HTMLDivElement>(null)

  // タグを表示する
  const handleClickSelectArea = () => {
    setTagAreaActive(!tagAreaActive)
  }

  // タグをフィルタリングする
  const filterHandler = (e: any) => {
    if (e.target.checked) {
      setFilterTags((prevTags) => [...prevTags, e.target.value])
    } else {
      const tags = filterTags.filter(
        (filterTag) => filterTag !== e.target.value
      )
      setFilterTags([...tags])
    }
  }

  // 記事をフィルタリングする
  useEffect(() => {
    const filteredPosts = allPosts.filter((post) => {
      let active = false
      for (let i = 0; i < post.tags.length; i++) {
        if (filterTags.includes(post.tags[i])) {
          return (active = true)
        }
      }
      return active
    })
    setFilterPosts(filteredPosts)
  }, [filterTags])
  useEffect(() => {}, [filterPosts])

  useEffect(() => {
    const tags = tagsRef.current?.querySelectorAll("input")
    tags?.forEach((tag) => (tag.checked = true))
  }, [])

  return (
    <>
      <section className="kaisei-decol max-h-[calc(100vh-152px)] md:max-h-[calc(100vh-212px)] mb-8">
        <div className="bg-white rounded-xl border-dashed border-current border-2">
          <button
            onClick={handleClickSelectArea}
            className="flex gap-1 text-xl items-center w-full p-4 md:p-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M3.792 2.938A49.069 49.069 0 0112 2.25c2.797 0 5.54.236 8.209.688a1.857 1.857 0 011.541 1.836v1.044a3 3 0 01-.879 2.121l-6.182 6.182a1.5 1.5 0 00-.439 1.061v2.927a3 3 0 01-1.658 2.684l-1.757.878A.75.75 0 019.75 21v-5.818a1.5 1.5 0 00-.44-1.06L3.13 7.938a3 3 0 01-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836z"
                clipRule="evenodd"
              />
            </svg>
            タグで絞り込む
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${tagAreaActive && "rotate-180"} transition`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          <div
            className={`px-4 gap-4 mb-4 md:mb-8 ${
              tagAreaActive ? "grid" : "h-0 hidden opacity-0"
            }`}
            ref={tagAreaRef}
          >
            <div className="flex gap-4 flex-wrap" ref={tagsRef}>
              {allTags.map((tag: string, index: number) => (
                <label
                  key={`tags${index}`}
                  className={`md:text-xl bg-[#A31C00] transition text-white py-1 px-5 rounded-full cursor-pointer`}
                  style={
                    tagsRef.current?.querySelectorAll("input")[index].checked
                      ? {
                          boxShadow:
                            "3px 3px 6px rgba(0, 0, 0, 0.3),3px 3px 6px rgba(0, 0, 0, 0.3)",
                        }
                      : { filter: "grayscale(100%)" }
                  }
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    onChange={(e) => filterHandler(e)}
                    value={tag}
                  />
                  {tag}
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>
      <PostsArea filterPosts={filterPosts} />
    </>
  )
}

type PostsProps = {
  filterPosts: {
    id: string
    title: string
    description: string
    date: string
    slug: string
    tags: string[]
  }[]
}
function PostsArea(props: PostsProps) {
  const { filterPosts } = props
  return (
    <section className="grid md:grid-cols-2 gap-6 md:gap-10">
      {filterPosts.map((value, index: number) => (
        <Notepad
          key={`notepad${index}`}
          title={value.title}
          date={value.date}
          tags={value.tags}
          description={value.description}
          slug={value.id}
        />
      ))}
    </section>
  )
}
