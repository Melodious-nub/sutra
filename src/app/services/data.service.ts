import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // options are contain 195 country names on string array can be accessed from anywhere
  options: string[] = [
    'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia', 'Austria',
    'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan',
    'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
    'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the',
    'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'East Timor (Timor-Leste)',
    'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Fiji', 'Finland',
    'France', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea',
    'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
    'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'North Korea',
    'South Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya',
    'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands',
    'Mauritania', 'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique',
    'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Macedonia',
    'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines',
    'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
    'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia', 'Slovenia',
    'Solomon Islands', 'Somalia', 'South Africa', 'Spain', 'Sri Lanka', 'Sudan', 'Sudan, South', 'Suriname', 'Sweden', 'Switzerland',
    'Syria', 'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey',
    'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
    'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
  ];

  constructor(private http: HttpClient) { }

  login(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Registration/login', data);
  }

  signUp(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Registration', data);
  }

  sendEmail(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Registration/send-email', data);
  }

  verifyEmail(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Registration/verify-email', data);
  }

  // survey/profile form apis starts from here
  companyAboutData(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/CompanyAboutData', data);
  }

  // get data for aboutData
  getCompanyAboutData() {
    return this.http.get<any>(environment.baseUrl+'/api/v1/CompanyAboutData/aboutdata');
  }

  // post data general data
  postGeneralData(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/CompanyGeneralData', data);
  }

  // get data for generalData
  getCompanyGeneralData() {
    return this.http.get<any>(environment.baseUrl+'/api/v1/CompanyGeneralData/generalData');
  }

  // get data for department
  getDepartmentData() {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Department');
  }

  // post data for department values
  postDepartment(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Department', data);
  }

  // certificate post
  postCertificate(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Certificate', data);
  }

  // get cetificate data
  getCertificate(PageNumber:any, PageSize:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Certificate'+'?PageNumber='+ PageNumber +'&PageSize='+ PageSize);
  }

  // updated certificateData
  updateCertificate(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Certificate/update', data);
  }

  // delete certificate data
  deleteCertificate(id:any) {
    return this.http.delete<any>(environment.baseUrl+'/api/v1/Certificate/delete-certificate/'+ id);
  }

  // post audit data
  postAuditReport(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/AuditReport', data);
  }

  // get audit report data
  getAuditReport(PageNumber:any, PageSize:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/AuditReport'+'?PageNumber='+ PageNumber +'&PageSize='+ PageSize);
  }

  // updated audit
  updateAudit(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/AuditReport/update', data);
  }

  // delete audit data
  deleteAudit(id:any) {
    return this.http.delete<any>(environment.baseUrl+'/api/v1/AuditReport/delete-auditreport/'+ id);
  }  

  // add customer
  addCustomer(data: any) {
    return this.http.post<any>(environment.baseUrl + '/api/v1/Customer', data);
  }

  getCustomer(PageNumber:any, PageSize:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Customer'+'?PageNumber='+ PageNumber +'&PageSize='+ PageSize);
  }

  updateCustomer(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Customer/update', data);
  }

  deleteCustomer(id:any) {
    return this.http.delete<any>(environment.baseUrl+'/api/v1/Customer/delete-customer/'+ id);
  } 

  getCustomerNames() {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Customer/customerNames');
  }

  sendInviteToCustomer(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Customer/send-invitation', data);
  }

  // supplier
  addSupplier(data:any) {
    return this.http.post<any>(environment.baseUrl + '/api/v1/Supplier', data);
  }

  getSupplier(PageNumber:any, PageSize:any) {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Supplier'+'?PageNumber='+ PageNumber +'&PageSize='+ PageSize);
  }

  updateSupplier(data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Supplier/update', data);
  }

  deleteSupplier(id:any) {
    return this.http.delete<any>(environment.baseUrl+'/api/v1/Supplier/delete-supplier/'+ id);
  }   

  // manage invitations
  getinvitationList() {
    return this.http.get<any>(environment.baseUrl+'/api/v1/Customer/invitationList');
  }

  acceptInvitation (data:any) {
    return this.http.post<any>(environment.baseUrl+'/api/v1/Customer/accept-invitation', data);
  }


}
