import {Helmet} from 'react-helmet'

const PageHelmet = (props) => {
    const title = props.title;
    const pageDescription = props.description;
    const keywords = props.keywords;
  return (
    <Helmet>
        <title>Wander watch | {title}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={keywords} />
    </Helmet>
  )
}

export default PageHelmet