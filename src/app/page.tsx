import styles from './page.module.css'
import TodoList from "@/redux/TodoList";
import Test from "@/components/Test/Test";

export default function Home() {
  return (
    <div className={styles.container}>
     Hello Next
      <TodoList />
      <Test />
    </div>
  )
}
