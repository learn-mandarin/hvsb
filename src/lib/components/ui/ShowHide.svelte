<script lang="ts">
  let show = false;
  function toggle() {
    show = !show;
  }
</script>

<slot {show} {toggle} />
