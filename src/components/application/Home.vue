<template>
    <div class="profile-page">
        <section class="section-profile-cover section-shaped my-0">
            <div class="shape shape-style-1 shape-primary shape-skew alpha-4">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </section>
        <section class="section section-skew">
            <div class="container">
              <div class="card-profile mt--500" no-body>
                <router-view />
              </div>
            </div>
        </section>
    </div>
</template>
<script>
  export default {};
</script>
<style>
</style>
