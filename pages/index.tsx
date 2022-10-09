import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import CustomNavBar from '../components/CustomNavbar';
import CustomHeader from '../components/CustomHeader';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <CustomHeader page="home"></CustomHeader>
      <CustomNavBar page="home"></CustomNavBar>
    </div>
  )
}

export default Home
