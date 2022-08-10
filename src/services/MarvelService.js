class MarvelService {
  _apiBase = "https://gateway.marvel.com:443/v1/public/";
  _apiKey = "apikey=ba2d7ee0d8affe406c67a91966ebe4a9";
  _baseOffset = 210;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`
    );
    return res.data.results.map(this._transformedCharacter)
  };

  getCharacter = async (id) => {
    const res = await this.getResource(
      `${this._apiBase}characters/${id}?${this._apiKey}`
    );
    return this._transformedCharacter(res.data.results[0])
  };

  _transformedCharacter = (char) => {
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

}

export default MarvelService;
