<template>
  <tr>
    <td><a href="#"><i>NgoanN</i></a></td>
    <td><span style="cursor: pointer" data-toggle="tooltip" title="Day join project">10/11/2018</span></td>
    <td><button class="btn btn-secondary btn-sm">Today report</button></td>
    <td>
      <select class="select-custom" name="">
        <option value="">Select time to download</option>
        <option value="">1 week ago</option>
        <option value="">1 month ago</option>
        <option value="">3 month ago</option>
        <option value="">6 month ago</option>
        <option value="">12 month ago</option>
        <option value="">All</option>
      </select>
    </td>
    <td class="text-right">
      <button class="btn btn-success btn-sm">Download CSV</button>
      <button class="btn btn-danger btn-sm">Remove</button>
    </td>
  </tr>
</template>
<script>
  export default {
  };
</script>
<style>
</style>
