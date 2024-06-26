import { Helmet } from "react-helmet-async";


const Meta = ({ title, description, keywords }) => {
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
    </Helmet>
}

Meta.defaultProps ={
    title: "Welcome to ProShop",
    description: "We sell the best products at minimum price",
    keywords: "electronics, buy electronics, cheap eletronics"
}

export default Meta;