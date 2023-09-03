import styles from "./page.module.css"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>next-auth</h1>
        <p>I tried to make a style like nextjs</p>

        <div className={styles.links}>
          <a href="/signup">signup</a>
          <a href="/signup">signin</a>
        </div>
      </div>
    </main>
  )
}
