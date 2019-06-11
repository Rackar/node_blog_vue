import { shallowMount } from "@vue/test-utils";
import upload from "@/components/upload.vue";

describe("upload.vue", () => {
  it("renders props.uploadType when passed", () => {
    const uploadType = {
      type: "avatar",
      data: ""
    };
    const wrapper = shallowMount(upload, {
      propsData: {
        uploadType
      }
    });
    expect(wrapper.vm.apiPath).toBe("/api/user/image");
  });
});
