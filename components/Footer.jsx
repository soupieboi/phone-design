export default function Footer({ privacy }) {
  return (
    <footer className={(privacy ? 'mt-8' : 'mt-0')}>
      <div className="footer-bottom p-4 bg-maincolor-lightest w-full flex flex-row justify-center items-center h-fit base:h-20 text-center">
        <span>VALTracker was created under Riot Games' "Legal Jibber Jabber" policy using assets owned by Riot Games. Riot Games does not endorse or sponsor this project.</span>
      </div>
    </footer>
  )
}