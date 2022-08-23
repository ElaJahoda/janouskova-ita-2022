export const urls = {
  homePage: '/',
  jsHistory: '/jshistory',
  counter: '/counter',
  toDo: '/todo',
  hackertyper: '/hackertyper',
  mortgageCalculator: '/mortgage-calculator',
  memoryGame: '/memory-game',
  httpFilter: '/http-filter',
  blogPost: '/blog',
  blogNewArticle: '/blog/new-article',
  blogArticles: '/blog/articles',
  jsAdoptionByMicrosoft: 'adoption-by-microsoft',
  jsCreationAtNetscape: 'creation-at-netscape',
  jsTheRiseOfJScript: 'the-rise-of-jscript',
  jsGrowthAndStandardization: 'growth-and-standardization',
  jsReachingMaturity: 'reaching-maturity',
  jsAdoptionByMicrosoftUrlAll: '/jshistory#adoption-by-microsoft',
  jsCreationAtNetscapeUrlAll: '/jshistory#creation-at-netscape',
  jsTheRiseOfJScriptUrlAll: '/jshistory#the-rise-of-jscript',
  jsGrowthAndStandardizationUrlAll: '/jshistory#growth-and-standardization',
  jsReachingMaturityUrlAll: '/jshistory#reaching-maturity',
}
export const concatUrls = (urls: String[]) => {
  return urls.map(url => `${url}`).join('')
}
