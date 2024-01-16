// DepartmentListComponent.tsx
import React, { useState } from 'react';

interface Department {
  department: string;
  sub_departments: string[];
}

interface DepartmentListComponentProps {
  departmentData: Department[];
}

const DepartmentListComponent: React.FC<DepartmentListComponentProps> = ({ departmentData }) => {
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<{ [key: string]: string[] }>({});

  const toggleDepartment = (department: string) => {
    setExpandedDepartments((prevExpanded) =>
      prevExpanded.includes(department)
        ? prevExpanded.filter((dep) => dep !== department)
        : [...prevExpanded, department]
    );
  };

  const toggleSelectDepartment = (department: string) => {
    const subDepartments = departmentData.find((dep) => dep.department === department)?.sub_departments || [];

    setSelectedDepartments((prevSelected) =>
      prevSelected.includes(department)
        ? prevSelected.filter((dep) => dep !== department)
        : [...prevSelected, department]
    );

    setSelectedSubDepartments((prevSelected) => {
      return {
        ...prevSelected,
        [department]: selectedSubDepartments[department]?.length === subDepartments.length ? [] : subDepartments,
      };
    });

    setExpandedDepartments((prevExpanded) =>
      prevExpanded.includes(department)
        ? prevExpanded
        : [...prevExpanded, department]
    );
  };

  const toggleSelectSubDepartment = (department: string, subDepartment: string) => {
    setSelectedSubDepartments((prevSelected) => {
      const selectedSubs = prevSelected[department] || [];

      return {
        ...prevSelected,
        [department]: selectedSubs.includes(subDepartment)
          ? selectedSubs.filter((subDep) => subDep !== subDepartment)
          : [...selectedSubs, subDepartment],
      };
    });
  };

  const isDepartmentExpanded = (department: string) => expandedDepartments.includes(department);

  const isDepartmentSelected = (department: string) =>
    selectedDepartments.includes(department) ||
    (selectedSubDepartments[department]?.length ===
      departmentData.find((dep) => dep.department === department)?.sub_departments.length);

  const isSubDepartmentSelected = (department: string, subDepartment: string) =>
    selectedSubDepartments[department]?.includes(subDepartment);

  return (
    <div>
      <h2>Department List Component</h2>
      {departmentData.map((department) => (
        <div key={department.department}>
          <div
            style={{ cursor: 'pointer', fontSize: '18px' }}
            onClick={() => toggleDepartment(department.department)}
          >
            {isDepartmentExpanded(department.department) ? '▼' : '►'}{' '}
            <input
              type="checkbox"
              style={{ width: '20px', height: '20px', marginRight: '5px' }}
              checked={isDepartmentSelected(department.department)}
              onChange={() => toggleSelectDepartment(department.department)}
            />
            {department.department}
          </div>
          {isDepartmentExpanded(department.department) && (
            <ul>
              {department.sub_departments.map((subDepartment) => (
                <li key={subDepartment}>
                  <input
                    type="checkbox"
                    style={{ width: '18px', height: '18px', marginRight: '5px' }}
                    checked={isSubDepartmentSelected(department.department, subDepartment)}
                    onChange={() => toggleSelectSubDepartment(department.department, subDepartment)}
                  />
                  {subDepartment}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default DepartmentListComponent;
