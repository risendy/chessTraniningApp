<template>
<button type="button" class="btn btn-primary" @click="$emit('getposition')">Next position <i class="fas fa-arrow-right"></i></button>
</template>

<script>
export default {
  data: () => ({
    name: "Kuba"
  })
}

</script>