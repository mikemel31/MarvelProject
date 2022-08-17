const View = ({ char }) => {
    const { name, description, thumbnail, homepageHref, wikiHref, comics } = char;
    const imgFit =
      thumbnail !==
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? null
        : { objectFit: "unset" };
    return (
      <>
        <div className="char__basics">
          <img src={thumbnail} alt={name} style={imgFit} />
          <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
              <a href={homepageHref} target="_blank" rel="noreferrer" className="button button__main">
                <div className="inner">homepage</div>
              </a>
              <a href={wikiHref} target="_blank" rel="noreferrer" className="button button__secondary">
                <div className="inner">Wiki</div>
              </a>
            </div>
          </div>
        </div>
        <div className="char__descr">{description}</div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
          {comics.length === 0 ? `There are no comics for ${name} yet` : null}
          {comics.map((item, i) => {
            // eslint-disable-next-line
            if (i > 9) return;
            return (
              <li key={i} className="char__comics-item">
                {item.name}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  export default View