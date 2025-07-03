import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../../../security/service/auth.service';
import { PcrService } from '../../../../service/pcr.service';
import { ServicerequestService } from '../../../../service/servicerequest.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-pcr-landing',
  templateUrl: './pcr-landing.component.html',
  styleUrls: ['./pcr-landing.component.scss']
})
export class PcrLandingComponent implements OnInit {
  public serviceRequestNumber: any;
  public categoryData: any;
  public problemData: any;
  public causeData: any;
  public resolutionData: any;
  public selectedCategory: any;
  public selectedProblem: any;
  public selectedCause: any;
  public selectedResolution: any;
  public loading: boolean;
  public invalidFields: string;
  public customerNumber: string;
  public lineOfService: string;

  constructor(
    private pcrService: PcrService,
    private serviceRequestService: ServicerequestService,
    private authService: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.loading = true;

    this.route.paramMap
    .pipe(map((params: ParamMap) => params.get('serviceRequestNumber')))
      .subscribe(serviceRequestNumber => {
        this.serviceRequestNumber = serviceRequestNumber;
      });

    this.serviceRequestService
      .getServiceRequest(this.serviceRequestNumber)
      .subscribe((serviceRequest: any) => {
        this.customerNumber = serviceRequest.results.customerNumber;
        this.lineOfService = serviceRequest.results.lineOfService;

        this.pcrService
          .getAllCategories(this.customerNumber, this.lineOfService)
          .subscribe((categories: any) => {
            this.categoryData = categories;
            this.loading = false;
          });
      });
  }

  public onCategoryUpdated(item: any) {
    if (item) {
      this.loading = true;
      this.selectedCategory = item;
      this.selectedProblem = null;
      this.selectedCause = null;
      this.selectedResolution = null;

      this.pcrService
        .getPcrForCategory(
          this.customerNumber,
          this.lineOfService,
          this.selectedCategory
        )
        .subscribe((pcr: any) => {
          this.problemData = pcr.problems;
          this.causeData = pcr.causes;
          this.resolutionData = pcr.resolutions;
          this.loading = false;
        });

      if (this.invalidFields) {
        this.setInvalidFields();
      }
    }
  }

  public onPcrUpdated(item: any) {
    if (this.invalidFields) {
      this.setInvalidFields();
    }
  }

  public onSubmit() {
    this.setInvalidFields();

    let pcr = {
      category: this.selectedCategory,
      problem: this.selectedProblem,
      cause: this.selectedCause,
      resolution: this.selectedResolution
    };

    if (!this.invalidFields) {
      this.pcrService
        .postPcr(this.serviceRequestNumber, pcr)
        .subscribe((res: any) => {
          window.location.href =
            window.origin +
            `/servicerequest/${this.serviceRequestNumber}/success`;
        });
    }
  }

  private setInvalidFields() {
    this.invalidFields = '';
    if (!this.selectedCategory) {
      this.invalidFields = 'Category, ';
    }
    if (!this.selectedProblem) {
      this.invalidFields += 'Problem, ';
    }
    if (!this.selectedCause) {
      this.invalidFields += 'Cause, ';
    }
    if (!this.selectedResolution) {
      this.invalidFields += 'Resolution, ';
    }
    if (this.invalidFields) {
      this.invalidFields = this.invalidFields.substring(
        0,
        this.invalidFields.length - 2
      );
    }
  }
}
