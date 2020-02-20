import { Component, OnInit } from '@angular/core';
import { EteuentryService } from 'src/app/eteuentry.service';
import { FileUploader } from 'ng2-file-upload';
import { DocumentUpload } from 'src/app/model/common.model';
import { User } from 'src/app/model/user.model';
import { HttpEventType, HttpEvent, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent implements OnInit {

  constructor(
    private service: EteuentryService,
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { 

    this.form = this.fb.group({
      avatar: [null]
    })

    
  }
  fileValid: boolean = false;
  point: number = 0;
  allUploaded: boolean = false;
  // uploadedFilesNum: number = 0;
  totalPoint: number = 0;
  completed: boolean = false;
  Transcript1: any;
  

  uploadedFiles: Array < File > = [];


  public user: User = JSON.parse(sessionStorage.getItem("ETEUPORTALUSER")).data;




  // private localUri = `http://localhost:3000/api/v1/files/applciant_document/${this.user.vit_id}`
   private localUri = `https://app.ethioportal.eu:2626/api/v1/files/applciant_document/${this.user.vit_id}`
  // private uri = ;

  public uploader:FileUploader = new FileUploader(
    {url: this.localUri, maxFileSize: 1024000, 
    queueLimit: 11,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf'],
    additionalParameter: {
      pay_id: this.user.vit_id,
    }
});
  public hasBaseDropZoneOver:boolean = false;
  public hasAnotherDropZoneOver:boolean = false;
  // public files = this.uploader.addToQueue()
  public docUpload: DocumentUpload = {userId: this.user.vit_id, transcript_1: '', transcript_2: '', bsc: '', msc: '', certificate_1: '', recom_1: ''}

  ngOnInit() {
   
  }

  fileArr = [];
  imgArr = [];
  fileObj = [];
  form: FormGroup;
  msg: string;
  progress: number = 0;



  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
