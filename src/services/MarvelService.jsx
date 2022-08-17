import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=ba2d7ee0d8affe406c67a91966ebe4a9";
  const _baseOffset = 210;
  const _comicsOffset = 0;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
    return res.data.results.map(_transformedCharacter)
  };

  const getCharacter = async (id) => {
    const res = await request(
      `${_apiBase}characters/${id}?${_apiKey}`
    );
    return _transformedCharacter(res.data.results[0])
  };

  const _transformedCharacter = (char) => {
    const wikihref = char.urls[0].url;
    const homepagehref = char.urls[1].url
    const chardescription = () => {if (char.description.length !==0) {
      if (char.description.length > 200) { return char.description.substring(0, 200).concat('...') } else { 
        return char.description
      } 
    } else { return 'There is no description yet for this character'}}
    
    return {
      id: char.id,
      name: char.name,
      description: chardescription() ,
      thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
      homepageHref: homepagehref,
      wikiHref: wikihref,
      comics: char.comics.items
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
    console.log(item.prices, `${item.thumbnail.path}.${item.thumbnail.extension}`)
    return {
      thumbnail: `${item.thumbnail.path}.${item.thumbnail.extension}`,
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
