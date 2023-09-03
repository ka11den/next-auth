"use client"

import React from "react"
import axios from "axios"
import cn from "classnames";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { toast } from "react-toastify";

export default function Signup () {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    username: "",
    password: "",
  })

  const onSignup = async () => {
    try {
      await axios.post("/api/auth/signup", user);
      toast.success("A code will be sent to your email soon...")
      setInterval(() => {
        router.push("/verify");
      }, 4000)
    } catch (error:any) {
      toast.error("Unexpected error")
    }
  }

  return (
    <section className={cn(styles.signup, styles.section)}>
    <div className={cn(styles.signup__container, styles.grid)}>
      <div>
        <h1 className={styles.signup__title}>
          Signup
        </h1>
      </div>
      <div className={styles.signup__data}>
        <div className={styles.signup__form}>
          <div>
            <div className={styles.signup__inputs}>
              <div>
                <input
                  className={styles.signup__input}
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setUser({...user, email: e.target.value})}
                />
              </div>

              <div>
                <input
                  className={styles.signup__input}
                  placeholder="Enter your username"
                  required
                  onChange={(e) => setUser({...user, username: e.target.value})}
                />
              </div>

              <div>
                <input
                  className={styles.signup__input}
                  placeholder="Enter your password"
                  type="password"
                  required
                  onChange={(e) => setUser({...user, password: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div>
            <div className={styles.signup__buttons}>
              <button onClick={onSignup} className={styles.signup__btn}>Signup</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
