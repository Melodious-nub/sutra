import { Component } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
interface generalDataForm {
  typeOfCompany: Number | string,
  typeOfOthers: null | string,
  listOfPartner: [
    {investorName: null | string, originOfInvestor: null | string, percentageOfShare: null | any}
  ],
  yearOfFundation: null | Number,
}

@Component({
  selector: 'app-general-data',
  templateUrl: './general-data.component.html',
  styleUrl: './general-data.component.css'
})
export class GeneralDataComponent {
  // total generaldata form with imported interface
  generalData: generalDataForm = {
    typeOfCompany: 1,
    typeOfOthers: null,
    listOfPartner: [{ investorName: null, originOfInvestor: null, percentageOfShare: null }],
    yearOfFundation: null,
  }

  // main storage for checkbox Post and get
  economicSelectedOptions: Set<string> = new Set();

  // for country list
  options: string[] = [];

  constructor(private api: DataService, private router: Router, private toastr: ToastrService,) { 
    this.options = this.api.options;
  }
  
  // typehead method
  search = (text$: Observable<string>) => 
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? [] : this.options.filter(v => v.toLowerCase().includes(term.toLowerCase())).slice(0, 10))
    );

  formatter = (result: string) => result;
  // end typehead method

  // for adding listOfPartner
  addPartnerList(): void {
    this.generalData.listOfPartner.push({ investorName: null, originOfInvestor: null, percentageOfShare: null});
  }

  // for removing listOfPartner
  removePartnerList(index: number): void {
    if (index > -1 && this.generalData.listOfPartner.length > 1) {
      this.generalData.listOfPartner.splice(index, 1);
    }
  }

  // Function to calculate the total percentage
  getTotalPercentage(): number {
    return this.generalData.listOfPartner.reduce((sum, partner) => sum + (partner.percentageOfShare || 0), 0);
  }

  // Check if the total percentage exceeds 100
  isTotalPercentageExceeded(): boolean {
    return this.getTotalPercentage() > 100;
  }

  // for multiple checkboxes
  economicCheckOptions = ['Brand', 'Retail', 'Trading', 'Buying Agent', 'Manufacturing, Consultancy', 'IT', 'Logistic', 'Others'];

  updateSelectedOptions(option: string, event: any) {
    if (event.target.checked) {
      this.economicSelectedOptions.add(option);
    } else {
      this.economicSelectedOptions.delete(option);
    }
  }
  // this method return to readonly input for viewing the values
  get selectedOptionsText(): string {
    return Array.from(this.economicSelectedOptions).join(', ');
  }
  // end multiple selection droupdown functionality

  onGeneralDataSubmit() {
    
  }

}
