import { STATES } from "./states";

export type StateContent = {
  cojEnforceability: string;
  usuryNotes: string;
  recentDevelopments: string;
  localCourts: string;
};

export function buildStateContent(stateName: string): StateContent {
  return {
    cojEnforceability: `In ${stateName}, Confessions of Judgment from MCA contracts face specific procedural requirements. Local courts evaluate them against state procedural rules and may decline enforcement when the contract or filing falls short. We work with attorneys licensed in ${stateName} to challenge improper COJ filings.`,
    usuryNotes: `${stateName} treats most merchant cash advances as commercial transactions rather than loans, which exempts them from typical usury caps. That said, ${stateName} courts increasingly scrutinize whether a contract is a true sale of receivables or a disguised loan. We help frame the right argument for your situation.`,
    recentDevelopments: `Recent regulatory and case-law developments in ${stateName} continue to shape how MCA contracts are enforced. We track these changes and feed them back into program strategy for clients in your state.`,
    localCourts: `Local court familiarity with MCA litigation in ${stateName} varies by county. We work with counsel who know the venues that matter for your business.`,
  };
}

export function listStates() {
  return STATES;
}
