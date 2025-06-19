import { IEmployee } from "@/providers/http/employees/interface";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff",
    color: "#1f2937",
    padding: 40,
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 30,
    borderBottom: 2,
    borderBottomColor: "#3b82f6",
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    color: "#000000",
    textAlign: "center",
  },
  employeeCard: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
  },
  employeeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingBottom: 10,
    borderBottom: 1,
    borderBottomColor: "#e2e8f0",
  },
  employeeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  employeeId: {
    fontSize: 10,
    color: "#000000",
    backgroundColor: "#e0e7ff",
    padding: "4 8",
    marginTop: 4,
    borderRadius: 4,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  infoItem: {
    width: "48%",
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 9,
    color: "#6b7280",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 11,
    color: "#374151",
    fontWeight: "normal",
  },
  salaryHighlight: {
    backgroundColor: "#dcfce7",
    color: "#166534",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    fontWeight: "bold",
  },
  departmentBadge: {
    backgroundColor: "#dbeafe",
    color: "#1e40af",
    padding: "4 8",
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "bold",
  },
  positionBadge: {
    backgroundColor: "#fef3c7",
    color: "#92400e",
    padding: "4 8",
    borderRadius: 4,
    fontSize: 10,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#9ca3af",
    borderTop: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 10,
  },
  viewer: {
    width: "100%",
    height: "100vh",
  },
  summarySection: {
    backgroundColor: "#f1f5f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#cbd5e1",
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1e40af",
    marginBottom: 10,
    textAlign: "center",
  },
  summaryStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e40af",
  },
  statLabel: {
    fontSize: 9,
    color: "#6b7280",
    marginTop: 2,
  },
});

export interface Employee {
  identification: string;
  email: string;
  name: string;
  monthly_salary: number;
  entry_date: string;
  jobPosition: {
    uuid: string;
    name: string;
  };
  department: {
    uuid: string;
    name: string;
  };
}

interface EmployeeReportProps {
  employees: IEmployee[];
  reportTitle?: string;
  generatedDate?: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function EmployeeReportDocument({
  employees,
  reportTitle = "Employee Report",
  generatedDate,
}: EmployeeReportProps) {
  const totalEmployees = employees.length;
  const totalSalary = employees.reduce(
    (sum, emp) => sum + parseFloat(emp.monthly_salary),
    0
  );
  const avgSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;
  const departments = [...new Set(employees.map((emp) => emp.department.name))];

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{reportTitle}</Text>
          <Text style={styles.subtitle}>
            Generated on{" "}
            {generatedDate ||
              new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
          </Text>
        </View>

        {/* Summary Section */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Report Summary</Text>
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalEmployees}</Text>
              <Text style={styles.statLabel}>Total Employees</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{departments.length}</Text>
              <Text style={styles.statLabel}>Departments</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{formatCurrency(avgSalary)}</Text>
              <Text style={styles.statLabel}>Avg. Salary</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>
                {formatCurrency(totalSalary)}
              </Text>
              <Text style={styles.statLabel}>Total Payroll</Text>
            </View>
          </View>
        </View>

        {/* Employee Cards */}
        {employees.map((employee, index) => (
          <View key={employee.identification} style={styles.employeeCard}>
            <View style={styles.employeeHeader}>
              <View>
                <Text style={styles.employeeName}>{employee.name}</Text>
                <Text style={styles.employeeId}>
                  ID: {employee.identification}
                </Text>
              </View>
              <View style={styles.salaryHighlight}>
                <Text>
                  {formatCurrency(parseFloat(employee.monthly_salary))}/month
                </Text>
              </View>
            </View>

            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Email Address</Text>
                <Text style={styles.infoValue}>{employee.email}</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Entry Date</Text>
                <Text style={styles.infoValue}>
                  {formatDate(employee.entry_date.toString())}
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Department</Text>
                <View style={styles.departmentBadge}>
                  <Text>{employee.department.name}</Text>
                </View>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Position</Text>
                <View style={styles.positionBadge}>
                  <Text>{employee.positionType.name}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            This report contains confidential employee information. Handle with
            care and in accordance with company privacy policies.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export function EmployeeReport({
  employees,
  reportTitle,
  generatedDate,
}: EmployeeReportProps) {
  return (
    <PDFViewer style={styles.viewer}>
      <EmployeeReportDocument
        employees={employees}
        reportTitle={reportTitle}
        generatedDate={generatedDate}
      />
    </PDFViewer>
  );
}
