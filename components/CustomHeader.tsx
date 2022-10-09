import Head from 'next/head'
import { AdminPages } from '../const/const';

type HeaderProps = {
  page: AdminPages
};

const CustomHeader: React.FC<HeaderProps> = (props) => {
  const page = props.page[0].toUpperCase() + props.page.substring(1)
  return (
    <Head>
      <title>{page}</title>
      <meta name="description" content={`${page} page`} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}

export default CustomHeader
