import { Component, OnInit, ViewChild } from "@angular/core";
import { ClrWizard } from "@clr/angular";
import { ToastContainerDirective, ToastrService } from "ngx-toastr";
import { User } from "src/app/model/user.model";
import { FileUploader } from "ng2-file-upload";
import { FileDropDirective } from "ng2-file-upload";
import { ActivatedRoute } from "@angular/router";

export interface Ticket {
  accId: string;
  uniNum: string;
  motLetter: boolean;
  bank: string;
  total: string;
}
@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.scss"]
})
export class PaymentComponent implements OnInit {
  /**************/

  public readonly proccessing_fee = 2500;
  public readonly proccessing_fee_plus = 2700;
  public readonly utility_cose = 300;
  public utilities: any = 0;

  /*************/

  @ViewChild("wizardlg") wizardLarge: ClrWizard;

  @ViewChild(ToastContainerDirective) toastContainer: ToastContainerDirective;

  public user: User = JSON.parse(sessionStorage.getItem("ETEUPORTALUSER")).data;
  public ticket: Ticket = {
    accId: this.user.vit_id,
    uniNum: "",
    motLetter: null,
    bank: "ETB",
    total: ""
  };

  public mtvLetter: boolean = false;
  public uniNum: boolean = false;
  public status: string = "incomplete";
  public totalPay: number = this.proccessing_fee;

  /****** Bank Info ******/
  public CBE: string = "1000296920324";
  public IBAN: string = "HU371177313301072572";
  /**********************/

  public lgOpen: boolean = false;
  public reason: string = '';
  public schlruser: boolean = false;
  /****** ToDo Info ******/
  // setup paypal
  // setup gocardless
  /**********************/

   private uri = `https://app.ethioportal.eu:2626/api/v1/files/payment_upload/${this.user.vit_id}`;
  // private uri = `http://localhost:3000/api/v1/files/payment_upload/${this.user.vit_id}`;


  public showEticket: boolean = false;

  public uploader:FileUploader = new FileUploader(
    {url: this.uri, maxFileSize: 1024000, 
    queueLimit: 11,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf'],
    additionalParameter: {
      pay_id: this.user.vit_id,
    }
});

  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response: string;
  fileName: string;

  constructor(private toastr: ToastrService, private route: ActivatedRoute) {

    if(this.route.snapshot.params["reason"] === "pay_for_item") {
      this.showEticket = true;
      this.lgOpen = true;
      this.totalPay = this.utilities;
    }
    
    this.hasBaseDropZoneOver = false;
    this.hasAnotherDropZoneOver = false;

    this.response = "";

    this.uploader.response.subscribe(res => (this.response = res));
  }

  ngOnInit() {
    // console.log(this.route.snapshot.params['reason']);
    // console.log(this.user.role)

    this.toastr.overlayContainer = this.toastContainer;
  }


  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
    // this.fileName = item._file.name;
    console.log(e._file.nam);
  }

  public calculateTotal() {
    if (!this.mtvLetter || !this.uniNum) {
      this.totalPay = this.proccessing_fee + this.utility_cose;
    }

    if (this.mtvLetter || this.uniNum) {
      this.totalPay = this.proccessing_fee_plus + this.utility_cose;
    }


    if ((this.mtvLetter && !this.uniNum) || (!this.mtvLetter && this.uniNum)) {
   //   console.log('me') ;
      this.totalPay = this.proccessing_fee;
    }

  }

  public saveReceipt(): void {}
}
