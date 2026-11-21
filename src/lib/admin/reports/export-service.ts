
import ExcelJS from "exceljs";
import { getAllApplicationsForExport } from "./report-service";

export type ExportType = "all" | "individual" | "corporate";

function excelValue(value: unknown): ExcelJS.CellValue {
  if (value === null || value === undefined) return "";

  if (value instanceof Date) return value;

  if (typeof value === "bigint") return value.toString();

  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value);
  }

  return value as ExcelJS.CellValue;
}

function addRecordsSheet(
  workbook: ExcelJS.Workbook,
  name: string,
  records: Record<string, unknown>[],
) {
  const sheet = workbook.addWorksheet(name);

  if (records.length === 0) {
    sheet.addRow(["No records found"]);
    return;
  }

  const columns = Object.keys(records[0]);

  sheet.columns = columns.map((key) => ({
    header: key,
    key,
    width: Math.min(Math.max(key.length + 5, 18), 35),
  }));

  records.forEach((record) => {
    const row: Record<string, ExcelJS.CellValue> = {};

    columns.forEach((key) => {
      row[key] = excelValue(record[key]);
    });

    sheet.addRow(row);
  });

  sheet.getRow(1).font = { bold: true };
  sheet.views = [{ state: "frozen", ySplit: 1 }];

  sheet.autoFilter = {
    from: "A1",
    to: `${sheet.getColumn(columns.length).letter}1`,
  };
}

export async function createApplicationsWorkbook(type: ExportType) {
  const { individuals, corporates } =
    await getAllApplicationsForExport();

  const workbook = new ExcelJS.Workbook();

  workbook.creator = "ACCTA Sri Lanka";
  workbook.created = new Date();

  // Individual application records
  if (type === "all" || type === "individual") {
    addRecordsSheet(
      workbook,
      "Individual Applications",
      individuals.map(({ referees, documents, ...application }) =>
        application as unknown as Record<string, unknown>
      ),
    );

    addRecordsSheet(
      workbook,
      "Individual Referees",
      individuals.flatMap((record) =>
        record.referees.map((referee) => ({
          applicationId: record.id,
          ...referee,
        })),
      ),
    );

    addRecordsSheet(
      workbook,
      "Individual Documents",
      individuals.flatMap((record) =>
        record.documents.map((document) => ({
          applicationId: record.id,
          ...document,
        })),
      ),
    );
  }

  // Corporate application records
  if (type === "all" || type === "corporate") {
    addRecordsSheet(
      workbook,
      "Corporate Applications",
      corporates.map(({ documents, ...application }) =>
        application as unknown as Record<string, unknown>
      ),
    );

    addRecordsSheet(
      workbook,
      "Corporate Documents",
      corporates.flatMap((record) =>
        record.documents.map((document) => ({
          applicationId: record.id,
          ...document,
        })),
      ),
    );
  }

  const buffer = await workbook.xlsx.writeBuffer();

  return Buffer.from(buffer);
}
