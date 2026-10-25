export function rupees(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}
