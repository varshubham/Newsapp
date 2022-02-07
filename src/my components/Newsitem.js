import React from 'react'

function Newsitem(props) {
    return (
      <>
        <div className="card mx-3 my-3 flex text-center">
          <img src={props.imageurl ? props.imageurl : "https://aniportalimages.s3.amazonaws.com/media/details/__sized__/asteroid2022020206115820220202063041-thumbnail-154x87-70.jpg"} className="card-img-top" alt="..." />
          <div className="card-body">
          <p className="badge rounded-pill bg-danger">{props.source}</p>
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            
            <p className="card-text"><small className="text-muted">by {props.author ? props.author : "unknown"} on {new Date(props.date).toUTCString()}</small></p>
            <a href={props.url} target="_blank" rel="noreferrer" className="btn btn-dark" >Read More</a>
          </div>
        </div>
      </>
    )
}

export default Newsitem