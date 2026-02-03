import { supabase } from '../lib/supabase';

/**
 * Interface for Hospital Staff
 */
export interface StaffMember {
  id?: string;
  name: string;
  designation: string;
  department: string;
  role: string;
  emp_id_no?: string;
  is_active: boolean;
}

/**
 * Master list of Staff Members
 * Extracted from: /Users/murali/Downloads/HOPE NEW All Staff List.docx
 */
export const staffMaster: StaffMember[] = [];

/**
 * Function to sync staff to Supabase
 */
export const syncStaffToDatabase = async () => {
  console.log('Syncing staff to database...');
  for (const staff of staffMaster) {
    try {
      const { data: existing } = await supabase
        .from('nabh_team_members')
        .select('id')
        .eq('name', staff.name)
        .maybeSingle();

      if (existing) {
        // Update existing if ID is missing
        await supabase
          .from('nabh_team_members')
          .update({ emp_id_no: staff.emp_id_no } as never)
          .eq('name', staff.name);
        continue;
      }

      const { error } = await supabase
        .from('nabh_team_members')
        .insert({
          name: staff.name,
          designation: staff.designation,
          department: staff.department,
          role: staff.role,
          emp_id_no: staff.emp_id_no,
          is_active: staff.is_active,
          responsibilities: []
        } as never);

      if (error) throw error;
    } catch (err) {
      console.error(`Error adding staff ${staff.name}:`, err);
    }
  }
  return { success: true };
};

export default staffMaster;
