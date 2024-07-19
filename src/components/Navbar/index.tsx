import styles,{layout} from "../style"
const Navbar = () => {
  return (
    <div className="flex flex-1 flex-wrap font-poppins font-normal sm:flex-grow">
      <h1 className={`${styles.button} text-ellipsis text-wrap`}>
        <ul className={layout.section}>
          <li>
            nh1
          </li>
        </ul>
      </h1>
    </div>
  )
}

export default Navbar
