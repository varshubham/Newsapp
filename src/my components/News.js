import React, { useEffect, useState } from 'react'

import Newsitem from './Newsitem'
import PropTypes from 'prop-types'
import Loading from './Loading'
import InfiniteScroll from "react-infinite-scroll-component";
import LoadingBar from 'react-top-loading-bar'


const News = (props) => {

  const [article, setArticle] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalresults, setTotalresults] = useState(0)
  const [progress,setProgress]=useState(0);
   document.title=`${props.category.charAt(0).toUpperCase() + props.category.slice(1)} - News`
  const updatenews = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.api}&pagesize=${props.pagesize}&page=${page}`;
    setLoading(true);
    setProgress(30);
    let data = await fetch(url);
    setProgress(50);
    let parseddata = await data.json();
    setProgress(70);
    setArticle(parseddata.articles);
    setTotalresults(parseddata.totalResults);
    setLoading(false);
    setProgress(100);


  }
  useEffect(() => {
    updatenews();
  }, [])




  const fetchMoreData = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.api}&pagesize=${props.pagesize}&page=${page + 1}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseddata = await data.json();
    setArticle(article.concat(parseddata.articles));
    setTotalresults(parseddata.totalResults);
    setLoading(false)


  };



  return (
    <>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className=' my-8 text-center'>
        <h2 style={{ backgroundColor: "red", marginTop: "60px" }}>{props.category.charAt(0).toUpperCase() + props.category.slice(1)} News</h2>
        {loading && <Loading />}

        <InfiniteScroll
          dataLength={article.length}
          next={fetchMoreData}
          hasMore={article.length !== totalresults}
          loader={<Loading />}
        >
          <div className="container">
            <div className="row">
              {article.map((element) => {
                return <div className="col-md-4 " key={element.url} >
                  <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageurl={element.urlToImage} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>

              })
              }
            </div>
          </div>
        </InfiniteScroll>
      </div>

    </>
  )

}

News.defaultProps = {
  country: 'in',
  pagesize: 9,
  category: 'general'
}
News.propTypes = {
  country: PropTypes.string,
  pagesize: PropTypes.number,
  category: PropTypes.string
}

export default News;