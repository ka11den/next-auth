"use client";

import React from "react"
import cn from "classnames";
import styles from "./page.module.css";
import axios from "axios";
import { toast } from "react-toastify";

export default function Verify () {
  const [token, setToken] = React.useState("");

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/auth/verify", {token})
      toast.success("You have successfully verrify to account!")
    } catch (error:any) {
      toast.error("Unexpected error")
    }
  }

  return (
  <section className={cn(styles.verify, styles.section)}>
    <div className={cn(styles.verify__container, styles.grid)}>
      <div>
        <h1 className={styles.verify__title}>
          Verify
        </h1>
      </div>
      <div className={styles.verify__data}>
        <div className={styles.verify__form}>
          <div>
            <div className={styles.verify__inputs}>
              <div>
                <input
                  className={styles.verify__input}
                  placeholder="Enter your code"
                  required
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <div className={styles.verify__buttons}>
              <button onClick={verifyUserEmail} className={styles.verify__btn}>Sumbit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  )
}
