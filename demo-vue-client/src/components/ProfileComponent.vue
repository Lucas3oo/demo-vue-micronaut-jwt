<script lang="ts">
import { defineComponent } from "vue";
import type { CustomUserClaim } from "@okta/okta-auth-js";

interface Claim {
  name: string;
  value: CustomUserClaim | CustomUserClaim[];
}


export default defineComponent({
  name: "ProfileComponent",
  data() {
    return {
      claims: [] as Claim[],
    };
  },
  async created() {
    this.claims = await Object.entries(await this.$auth.getUser()).map(
      (entry) => ({ name: entry[0], value: entry[1] })
    );
  },
});

</script>

<template>
  <div id="profile">
    <h1>My User Profile (ID Token Claims)</h1>
    <p>Below is the information from your ID token.</p>
    <table>
      <thead>
        <tr>
          <th>Claim</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(claim, index) in claims" :key="index">
          <td>{{ claim.name }}</td>
          <td :id="'claim-' + claim.name">{{ claim.value }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
