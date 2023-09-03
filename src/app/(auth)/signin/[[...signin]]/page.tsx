"use client"
import React from "react"
import cn from "classnames"
import styles from "./page.module.css"
import axios from "axios"
import { toast } from "react-toastify"

export default function Signin () {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  })

  const onSignin = async () => {
    try {
      await axios.post("/api/auth/signin", user);
      toast.success("You have successfully logged in to your account!")
    } catch (error:any) {
      toast.error("Unexpected error")
    }
  }

  return (
    <section className={cn(styles.signin, styles.section)}>
      <div className={cn(styles.signin__container, styles.grid)}>
        <div>
          <h1 className={styles.signin__title}>
            Signin
          </h1>
        </div>
        <div className={styles.signin__data}>
          <div className={styles.signin__form}>
            <div>
              <div className={styles.signin__inputs}>
                <div>
                  <input
                    className={styles.signin__input}
                    placeholder="Enter your email address"
                    required
                    onChange={(e) => setUser({...user, email: e.target.value})}
                  />
                </div>

                <div>
                  <input
                    className={styles.signin__input}
                    placeholder="Enter your password"
                    type="password"
                    required
                    onChange={(e) => setUser({...user, password: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <div className={styles.signin__buttons}>
                <button onClick={onSignin} className={styles.signin__btn}>Signin</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
