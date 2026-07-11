import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, recipeUrl } from '@/lib/site';

export async function GET(context: { site?: URL }) {
  const recipes = (await getCollection('recipes')).sort((a, b) => b.data.updatedAt.getTime() - a.data.updatedAt.getTime());
  return rss({
    title: 'HueSteps Makeup Recipes',
    description: SITE.description,
    site: context.site ?? new URL(SITE.url),
    items: recipes.map((recipe) => ({
      title: recipe.data.title,
      description: recipe.data.description,
      pubDate: recipe.data.updatedAt,
      link: recipeUrl(recipe.data.hub, recipe.data.slug)
    })),
    customData: '<language>en-us</language>'
  });
}
