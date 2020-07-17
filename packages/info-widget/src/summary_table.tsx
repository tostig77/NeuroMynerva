import * as React from "react";
import '../style/summary.css';

const displayData: string[] = [
  "name",
  "class",
  "vfb_id",
  "data_source",
  "transgenic_lines",
  "transmitters",
  "expresses"
];

const flyCircuitData: string[] = [
  "Lineage",
  "Similarneurons",
  "Name",
  "Author",
  "Driver",
  "GenderAge",
  "Stock"
];

const morphData: string[] = [
  "totalLength",
  "totalSurfaceArea",
  "totalVolume",
  "maximumEuclideanDistance",
  "width",
  "height",
  "depth",
  "numberOfBifurcations",
  "maxPathDistance",
  "averageDiameter"
];

/**
 * Reformat Field
 */
function reformatField(id: string, value: any) {
  if (typeof(value) === 'string') {
    return value as string;
  } else if (Array.isArray(value)) {
    let items: any = [];
    value.forEach((v, idx)=>{
      items.push(<option key={idx} value={v as string}>{v as string}</option>);
    });
    return (
      <select id={id}>
        {items}
      </select>
    )
  } else if (typeof(value) === 'object') {
    // let keys = Object.keys(value);
    let items: any = [];
    for (const [key, val] of Object.entries(value)) {
      items.push(<option key={key} value={val as string}>{key as string}: {val as string}</option>);
    }
    return (
      <select id={id}>
        {items}
      </select>
    )
  } else {
    return '';
  }
}

export function SummaryTable(props: { data: any }) {
  const rawData = props.data;
  let display = [];
  let morph = [];
  let flycircuit = [];

  for (let [key, val] of Object.entries(rawData)) {
    if (displayData.indexOf(key) > -1) {
      if (key.toLowerCase() === "name") {
        display.unshift(
          <tr key={key}>
            <td>{jsUcfirst(key)}</td>
            <td>{reformatField(key, val)}</td>
          </tr>
        );
      } else {
        display.push(
          <tr key={key}>
            <td>{jsUcfirst(key)}</td>
            <td>{reformatField(key, val)}</td>
          </tr>
        );
      }
    } else if (morphData.indexOf(key) > -1) {
      morph.push(
        <tr key={key}>
          <td>{jsUcfirst(key)}</td>
          <td>{reformatField(key, val)}</td>
        </tr>
      );
    } else if (key === "flycircuit_data") {
      for (let [key2, val2] of Object.entries(val as object)) {
        if (flyCircuitData.indexOf(key2) > -1) {
          flycircuit.push(
            <tr key={key2}>
              <td>{jsUcfirst(key2)}</td>
              <td>{reformatField(key2, val2)}</td>
            </tr>
          );
        }
      }
    }
  }

  if (display.length > 0) {
    return (
      <>
        <div 
        className={"table-grid lm-Widget p-Widget jp-RenderedHTMLCommon jp-RenderedMarkdown jp-MarkdownOutput"}
        data-mime-type={"text/markdown"}
        >
          <table className={"summary-table"}>
            <tbody>
              {display.concat(flycircuit).concat(morph)}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    return (
      <>
        <table className={"summary-table"}>
          <tbody>
            <div className={"summary-table table-grid"}>No summary information available</div>
          </tbody>
        </table>
      </>
    );
  }
}

/**
 * capitalizes first character in a given string
 * @param orig original string
 */
function jsUcfirst(orig: string): string {
  return orig.charAt(0).toUpperCase() + orig.slice(1);
}
