<script>
import { getCollection } from "astro:content";

export default {
  name: "FilteredProjects",
  components: {
  },
  data() {
    return {
      filteredProjects: []
    }
  },
  methods: {

  },
  mounted: async function() {
    // Filter blog entries with 'draft: false' & date before current date
    const publishedProjectEntries = await getCollection("projects", ({ data }) => {
      return !data.draft && data.publishDate < new Date();
    })

    // Sort content entries by publication date
    publishedProjectEntries.sort(function (a, b) {
      return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
    })

    publishedProjectEntries.map(project => {
      {(project.data.tags)}
      return this.filteredProjects.push(project)
    })
  },
  created: function() {
    // console.log(this.filteredProjects)
  }
}
</script>

<template>
  <div v-for="(project, i) in filteredProjects" class="workTile">
    <a data-parallax="window" :href="'/work/'+project.slug">
      <div class="relative">
        <div class="workTile__frame">
          <figure class="workTile__figure">
            <img class="workTile__img" :src=project.data.image.src alt="" />
          </figure>
        </div>
        <div class="workTile__wedge">
          <i class="arrow-right"></i>
        </div>
      </div>
      <div class="workTile__content">
        <h3 class="workTile__title h3">{{project.data.title}}</h3>
        <div class="workTile__tags">
          <span v-for="(tag, i) in project.data.tags" class="workTile__tag">{{tag}}{{ i === project.data.tags.length -1 ? '' : ', ' }}</span>
        </div>
      </div>
    </a>
  </div>
</template>