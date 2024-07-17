<script>
  import { onMount } from 'svelte';

  onMount(async () => {
    const resp = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const { csticket } = await resp.json();
        window.location = `http://studentnet.cs.manchester.ac.uk/authenticate/?url=https://www.studentadmin-manchester.uk/signin&csticket=${csticket}&version=3&command=validate`;
  });

</script>