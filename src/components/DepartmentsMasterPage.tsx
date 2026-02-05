import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Button,
  IconButton,
  Paper,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  Tooltip,
  Divider,
  CircularProgress
} from '@mui/material';
import {
  Search,
  Download,
  Add,
  Business,
  Schedule,
  CheckCircle,
  Cancel,
  Warning,
  Assessment
} from '@mui/icons-material';
import { supabase } from '../lib/supabase';

// Types
type DepartmentCategory = 'Clinical Speciality' | 'Super Speciality' | 'Support Services' | 'Administration';
type DepartmentType = 'Medical' | 'Surgical' | 'Diagnostic' | 'Support' | 'Administrative';

interface DepartmentDB {
  id: string;
  dept_id: string;
  name: string;
  code: string;
  category: string;
  type: string;
  description: string | null;
  head_of_department: string | null;
  contact_number: string | null;
  nabh_is_active: boolean;
  nabh_last_audit_date: string | null;
  nabh_compliance_status: string;
  services: string[] | null;
  equipment_list: string[] | null;
  staff_count: number | null;
  is_emergency_service: boolean;
  operating_hours: string | null;
  hospital_id: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Departments Master Page Component
 * Displays and manages all hospital departments from scope of services
 */
const DepartmentsMasterPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<DepartmentCategory | 'All'>('All');
  const [typeFilter, setTypeFilter] = useState<DepartmentType | 'All'>('All');
  const [complianceFilter, setComplianceFilter] = useState<'All' | 'Compliant' | 'Non-Compliant' | 'Under Review' | 'Not Assessed'>('All');
  const [showEmergencyOnly, setShowEmergencyOnly] = useState(false);

  // Supabase data state
  const [departmentsData, setDepartmentsData] = useState<DepartmentDB[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch departments from Supabase
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data, error } = await (supabase.from('departments') as any)
          .select('*')
          .eq('is_active', true)
          .order('dept_id', { ascending: true });

        if (error) {
          console.error('Error fetching departments:', error);
        } else {
          setDepartmentsData(data as DepartmentDB[] || []);
        }
      } catch (err) {
        console.error('Error fetching departments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  // Calculate statistics from fetched data
  const complianceStats = useMemo(() => {
    const total = departmentsData.length;
    const compliant = departmentsData.filter(dept => dept.nabh_compliance_status === 'Compliant').length;
    const nonCompliant = departmentsData.filter(dept => dept.nabh_compliance_status === 'Non-Compliant').length;
    const underReview = departmentsData.filter(dept => dept.nabh_compliance_status === 'Under Review').length;
    const notAssessed = departmentsData.filter(dept => dept.nabh_compliance_status === 'Not Assessed').length;
    return {
      total,
      compliant,
      nonCompliant,
      underReview,
      notAssessed,
      compliancePercentage: total > 0 ? Math.round((compliant / total) * 100) : 0
    };
  }, [departmentsData]);

  const categorySummary = useMemo(() => {
    return {
      'Clinical Speciality': departmentsData.filter(dept => dept.category === 'Clinical Speciality').length,
      'Super Speciality': departmentsData.filter(dept => dept.category === 'Super Speciality').length,
      'Support Services': departmentsData.filter(dept => dept.category === 'Support Services').length,
      'Administration': departmentsData.filter(dept => dept.category === 'Administration').length,
    };
  }, [departmentsData]);

  const emergencyDepartmentsCount = useMemo(() => {
    return departmentsData.filter(dept => dept.is_emergency_service).length;
  }, [departmentsData]);

  // Filter departments based on search and filters
  const filteredDepartments = useMemo(() => {
    let filtered = departmentsData;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(dept =>
        dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (dept.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(dept => dept.category === categoryFilter);
    }

    // Type filter
    if (typeFilter !== 'All') {
      filtered = filtered.filter(dept => dept.type === typeFilter);
    }

    // Compliance filter
    if (complianceFilter !== 'All') {
      filtered = filtered.filter(dept => dept.nabh_compliance_status === complianceFilter);
    }

    // Emergency services filter
    if (showEmergencyOnly) {
      filtered = filtered.filter(dept => dept.is_emergency_service);
    }

    return filtered;
  }, [departmentsData, searchTerm, categoryFilter, typeFilter, complianceFilter, showEmergencyOnly]);

  // Handle export to CSV
  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Code,Name,Category,Type,Emergency Service,Operating Hours,Compliance Status,Services\n" +
      departmentsData.map(dept =>
        `"${dept.code}","${dept.name}","${dept.category}","${dept.type}","${dept.is_emergency_service}","${dept.operating_hours || ''}","${dept.nabh_compliance_status}","${(dept.services || []).join(', ')}"`
      ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `departments_master_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get compliance status color and icon
  const getComplianceDisplay = (status: string) => {
    switch (status) {
      case 'Compliant':
        return { icon: CheckCircle, color: 'success' as const, label: 'Compliant' };
      case 'Non-Compliant':
        return { icon: Cancel, color: 'error' as const, label: 'Non-Compliant' };
      case 'Under Review':
        return { icon: Warning, color: 'warning' as const, label: 'Under Review' };
      default:
        return { icon: Warning, color: 'secondary' as const, label: 'Not Assessed' };
    }
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setTypeFilter('All');
    setComplianceFilter('All');
    setShowEmergencyOnly(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom>
              Departments Master
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Based on Scope of Services - Ayushman Nagpur Hospital (Sep 26, 2025)
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={handleExport}
              size="large"
            >
              Export for Audit
            </Button>
            <Button
              variant="contained"
              startIcon={<Add />}
              size="large"
            >
              Add Department
            </Button>
          </Box>
        </Box>

        {/* Statistics Dashboard */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="overline">
                      Total Departments
                    </Typography>
                    <Typography variant="h4">
                      {complianceStats.total}
                    </Typography>
                  </Box>
                  <Business color="primary" sx={{ fontSize: 32 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="overline">
                      NABH Compliance
                    </Typography>
                    <Typography variant="h4" color="success.main">
                      {complianceStats.compliancePercentage}%
                    </Typography>
                  </Box>
                  <CheckCircle color="success" sx={{ fontSize: 32 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="overline">
                      Emergency Services
                    </Typography>
                    <Typography variant="h4" color="error.main">
                      {emergencyDepartmentsCount}
                    </Typography>
                  </Box>
                  <Schedule color="error" sx={{ fontSize: 32 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="text.secondary" variant="overline">
                      Under Review
                    </Typography>
                    <Typography variant="h4" color="warning.main">
                      {complianceStats.underReview}
                    </Typography>
                  </Box>
                  <Warning color="warning" sx={{ fontSize: 32 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Category Summary */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Assessment />
              Department Categories
            </Typography>
            <Grid container spacing={3}>
              {Object.entries(categorySummary).map(([category, count]) => (
                <Grid size={{ xs: 6, md: 3 }} key={category}>
                  <Paper elevation={0} sx={{ p: 2, textAlign: 'center', bgcolor: 'grey.50' }}>
                    <Typography variant="h4" color="primary.main">
                      {count}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </Box>

      {/* Filters and Search */}
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3}>
            {/* Search */}
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Category Filter */}
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryFilter}
                  label="Category"
                  onChange={(e) => setCategoryFilter(e.target.value as DepartmentCategory | 'All')}
                >
                  <MenuItem value="All">All Categories</MenuItem>
                  <MenuItem value="Clinical Speciality">Clinical Speciality</MenuItem>
                  <MenuItem value="Super Speciality">Super Speciality</MenuItem>
                  <MenuItem value="Support Services">Support Services</MenuItem>
                  <MenuItem value="Administration">Administration</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Type Filter */}
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={typeFilter}
                  label="Type"
                  onChange={(e) => setTypeFilter(e.target.value as DepartmentType | 'All')}
                >
                  <MenuItem value="All">All Types</MenuItem>
                  <MenuItem value="Medical">Medical</MenuItem>
                  <MenuItem value="Surgical">Surgical</MenuItem>
                  <MenuItem value="Diagnostic">Diagnostic</MenuItem>
                  <MenuItem value="Support">Support</MenuItem>
                  <MenuItem value="Administrative">Administrative</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Compliance Filter */}
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Compliance</InputLabel>
                <Select
                  value={complianceFilter}
                  label="Compliance"
                  onChange={(e) => setComplianceFilter(e.target.value as typeof complianceFilter)}
                >
                  <MenuItem value="All">All Status</MenuItem>
                  <MenuItem value="Compliant">Compliant</MenuItem>
                  <MenuItem value="Non-Compliant">Non-Compliant</MenuItem>
                  <MenuItem value="Under Review">Under Review</MenuItem>
                  <MenuItem value="Not Assessed">Not Assessed</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Emergency Filter */}
            <Grid size={{ xs: 12, md: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showEmergencyOnly}
                    onChange={(e) => setShowEmergencyOnly(e.target.checked)}
                  />
                }
                label="Emergency Only"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Showing {filteredDepartments.length} of {departmentsData.length} departments
            </Typography>
            {(searchTerm || categoryFilter !== 'All' || typeFilter !== 'All' || complianceFilter !== 'All' || showEmergencyOnly) && (
              <Button
                size="small"
                onClick={clearAllFilters}
                color="primary"
              >
                Clear Filters
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Departments Grid */}
      {!loading && (
        <Grid container spacing={3}>
          {filteredDepartments.map((department) => {
            const complianceDisplay = getComplianceDisplay(department.nabh_compliance_status);
            const ComplianceIcon = complianceDisplay.icon;
            const services = department.services || [];

            return (
              <Grid size={{ xs: 12, lg: 6 }} key={department.id}>
                <Card sx={{ height: '100%', '&:hover': { boxShadow: 4 } }}>
                  <CardContent>
                    {/* Department Header */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="h6">
                            {department.name}
                          </Typography>
                          <Chip label={department.code} size="small" color="primary" variant="outlined" />
                          {department.is_emergency_service && (
                            <Chip label="24/7" size="small" color="error" />
                          )}
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          {department.description}
                        </Typography>
                      </Box>
                      <Tooltip title={complianceDisplay.label}>
                        <IconButton color={complianceDisplay.color} size="small">
                          <ComplianceIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>

                    {/* Department Details */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          CATEGORY
                        </Typography>
                        <Typography variant="body2">
                          {department.category}
                        </Typography>
                      </Grid>
                      <Grid size={{ xs: 6 }}>
                        <Typography variant="caption" color="text.secondary" display="block">
                          TYPE
                        </Typography>
                        <Typography variant="body2">
                          {department.type}
                        </Typography>
                      </Grid>
                    </Grid>

                    {/* Operating Hours */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Schedule fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {department.operating_hours || 'Not specified'}
                      </Typography>
                    </Box>

                    {/* Services */}
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                        SERVICES
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {services.slice(0, 3).map((service, index) => (
                          <Chip
                            key={index}
                            label={service}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                        {services.length > 3 && (
                          <Chip
                            label={`+${services.length - 3} more`}
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Compliance Status */}
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Chip
                        icon={<ComplianceIcon />}
                        label={complianceDisplay.label}
                        size="small"
                        color={complianceDisplay.color}
                        variant="outlined"
                      />
                      <Button size="small" color="primary">
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      {/* Empty State */}
      {!loading && filteredDepartments.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 6 }}>
          <Business sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No departments found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search criteria or filters.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default DepartmentsMasterPage;