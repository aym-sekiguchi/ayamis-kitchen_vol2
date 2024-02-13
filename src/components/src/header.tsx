import Link from "next/link"

type HeaderProps = {
  //
}

export function Header(props: HeaderProps) {
  const {} = props
  return (
    <header>
      <div
        className="h-24 bg-bottom md:h-32 w-full bg-repeat-x"
        style={{ backgroundImage: "url(/images/head.webp)" }}
      ></div>
      <div className="text-2xl md:text-3xl kaisei-decol mt-2 md:mt-4 mb-4 md:mb-8 max-w-5xl mx-auto">
        <Link href="/" className="pl-3">
          Ayami&#39;s Kitchen
        </Link>
      </div>
    </header>
  )
}
