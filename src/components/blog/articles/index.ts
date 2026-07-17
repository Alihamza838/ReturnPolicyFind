import * as React from "react";
import WalmartNoReceipt from "./WalmartNoReceipt";
import TargetExplained from "./TargetExplained";
import CostcoElectronics from "./CostcoElectronics";
import AmazonGuide from "./AmazonGuide";
import DswComplete from "./DswComplete";

export const articleComponents: Record<string, React.ComponentType> = {
  "walmart-return-policy-without-receipt": WalmartNoReceipt,
  "target-return-policy-explained": TargetExplained,
  "costco-electronics-return-policy": CostcoElectronics,
  "amazon-return-policy-guide": AmazonGuide,
  "dsw-return-policy-complete-guide": DswComplete,
};

export function getArticleComponent(slug: string): React.ComponentType | null {
  return articleComponents[slug] || null;
}
