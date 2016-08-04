/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component } from '@angular/core';
import { AlfrescoAuthenticationService } from 'ng2-alfresco-core';
import { FormService, ActivitiForm } from 'ng2-activiti-form';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

declare let __moduleName: string;
declare let AlfrescoApi: any;

@Component({
    moduleId: __moduleName,
    selector: 'createpatient-component',
    templateUrl: './patientdetails.component.html',
    styleUrls: ['./patientdetails.component.css'],
    providers: [FormService],
    directives: [ActivitiForm]
})
export class PatientDetailsComponent {

    private sub: Subscription;

    currentPath: string = '/Sites/swsdp/documentLibrary';

    metadata: any = {};

    nodeId: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authService: AlfrescoAuthenticationService) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.retriveNodeMetadataFromEcm(params['id']);
        });
    }

    private retriveNodeMetadataFromEcm(nodeId: string): void{
        var self = this;
        this.nodeId = nodeId;
        this.authService.getAlfrescoApi().nodes.getNodeInfo(this.nodeId).then(function (data) {
            console.log(data.properties);

            for (var key in data.properties) {
                console.log(key + ' => ' + data[key]);
                self.metadata [key.replace('hc:','')] = data.properties[key];
            }

        }, function (error) {
            console.log('This node does not exist');
        });
    }
}