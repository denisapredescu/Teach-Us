import { TestBed } from "@angular/core/testing";

import { MentorRequestsService } from "./mentor-requests.service";

describe("MentorRequestsService", () => {
  let service: MentorRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorRequestsService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
