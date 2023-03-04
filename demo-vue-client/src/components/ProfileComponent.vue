<script lang="ts">
import { defineComponent } from "vue";
import type { ClaimDto } from "@/okta";

export default defineComponent({
  name: "ProfileComponent",
  data() {
    return {
      claims: [] as ClaimDto[],
    };
  },
  /*

  async created() {
    this.claims = await Object.entries(await this.$auth.getUser()).map(
      (entry) => ({ claim: entry[0], value: entry[1].toString() })
    );
  },

  */
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
      <!--

        <tr v-for="(claim, index) in claims" :key="index">
          <td>{{ claim.claim }}</td>
          <td :id="'claim-' + claim.claim">{{ claim.value }}</td>
        </tr>
        -->
      </tbody>
    </table>
  </div>
</template>
