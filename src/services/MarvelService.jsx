import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=ba2d7ee0d8affe406c67a91966ebe4a9";
  const _baseOffset = 210;
  const _comicsOffset = 0;

  const getAllCharacters = async (offset = _baseOffset, limit = 9) => {
    const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformedCharacter)
  };

  const getCharacter = async (id) => {
    const res = await request(
      `${_apiBase}characters/${id}?${_apiKey}`
    );
    return _transformedCharacter(res.data.results[0])
  };

  const _transformedCharacter = (char) => {
    const chardescription = () => {if (char.description.length !==0) {
      if (char.description.length > 200) { return char.description.substring(0, 200).concat('...') } else { 
        return char.description
      } 
    } else { return 'There is no description yet for this character'}}
    
    return {
      id: char.id,
      name: char.name,
      description: chardescription() ,
      thumbnail: char.thumbnail.path.slice(0,4) + 's' + char.thumbnail.path.slice(4) + "." + char.thumbnail.extension,
      homepageHref: char.urls[1].url,
      wikiHref: char.urls[0].url,
      comics: char.comics.items.slice(0,10)
    };
  };

  const getAllComics = async (offset = _comicsOffset) => {
    const res = await request(`${_apiBase}comics?orderBy=modified&limit=8&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformedComics)
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    return _transformedComic(res.data.results[0])
  };

  const _transformedComics = (item) => {
    const price = item.prices[0].price ? item.prices[0].price : 'NOT AVAILABLE';
    return {
      thumbnail: `${item.thumbnail.path.slice(0,4)}s${item.thumbnail.path.slice(4)}.${item.thumbnail.extension}`,
      id: item.id,
      title: item.title,
      price: price 
    }
  }

  const _transformedComic = (item) => {
    const price =  item.prices[0].price ? item.prices[0].price : 'NOT AVAILABLE'
    return {
      thumbnail: item.thumbnail.path+'.'+item.thumbnail.extension,
      id: item.id,
      title: item.title,
      description: item.description && item.description.length !== 0 ? item.description : 'There is no description for this comic yet',
      pages: item.pageCount !== undefined && item.pageCount ? item.pageCount : 'DATA NOT AVAILABLE',
      lang: item.textObjects.language ? item.textObjects.language : 'DATA NOT AVAILABLE',
      price: price
    }
  }

  return {loading, error, getCharacter, getAllCharacters, clearError, getAllComics, getComic}
}

export default useMarvelService;
