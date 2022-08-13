import useHttp from "../hooks/http.hook";

const useMarvelService = () => {
  const {loading, request, error, clearError} = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";
  const _apiKey = "apikey=ba2d7ee0d8affe406c67a91966ebe4a9";
  const _baseOffset = 210;

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

  return {loading, error, getCharacter, getAllCharacters, clearError}
}

export default useMarvelService;
