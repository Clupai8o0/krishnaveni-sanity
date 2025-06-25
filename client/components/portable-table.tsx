import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

type TableRow = {
	_key: string;
	_type: "row";
	cells: string[];
};

type TableValue = {
	_type: "table";
	rows: TableRow[];
};

export const PortableTable = ({ value }: { value: TableValue }) => {
	const { rows } = value;
	if (!rows || rows.length === 0) {
		return null;
	}

	const [head, ...body] = rows;

	return (
		<Table>
			{head.cells.length > 0 && (
				<TableHeader>
					<TableRow>
						{head.cells.map((cell, index) => (
							<TableHead key={`${head._key}-${index}`}>{cell}</TableHead>
						))}
					</TableRow>
				</TableHeader>
			)}
			{body.length > 0 && (
				<TableBody>
					{body.map((row) => (
						<TableRow key={row._key}>
							{row.cells.map((cell, index) => (
								<TableCell key={`${row._key}-${index}`}>{cell}</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			)}
		</Table>
	);
}; 