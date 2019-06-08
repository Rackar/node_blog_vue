import { shallowMount } from "@vue/test-utils";
import uploadnew from "@/components/uploadnew.vue";

describe("uploadnew.vue", () => {
  it("renders props.uploadType when passed", () => {
    const uploadType = {
      type: "avatar",
      data: ""
    };
    const wrapper = shallowMount(uploadnew, {
      propsData: {
        uploadType
      }
    });
    expect(wrapper.vm.apiPath).toBe("/api/user/image");
  });
});
