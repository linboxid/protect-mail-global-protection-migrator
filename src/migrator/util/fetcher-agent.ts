import { Agent } from "https";

export const fetcherAgent = new Agent({
  rejectUnauthorized: false, // Disable SSL verification for self-signed certificates
  minVersion: "TLSv1.2", // Ensure minimum TLS version
});
