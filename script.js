const answers = {
  overview: "他能把 AI 接进真实工作流：设计 Agent、搭建 Python 服务、完成 Web / 小程序 / 桌面端，并用测试、校验和可恢复状态把 Demo 做成可交付产品。",
  best: "首推 Parameter Adjustment Agent。它把一句机器人动作目标变成完整强化学习闭环，包含奖励生成与校验、训练编排、多视角 rollout、联合验收和自动修订。",
  stack: "主力是 Python、FastAPI、Pydantic、Pytest；前端覆盖 React、TypeScript、微信小程序；桌面端使用 Electron、PySide6 / QML，也有强化学习与数据分析经验。",
  hire: "因为作品覆盖了从需求理解、系统设计到产品交付的完整路径。更重要的是：他会处理权限、安全、失败恢复和验收证据，而不是只让功能在理想情况下跑一次。"
};

const answer = document.querySelector("#copilot-answer");
const prompts = document.querySelectorAll(".prompt");

prompts.forEach((button) => {
  button.addEventListener("click", () => {
    prompts.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    answer.classList.add("is-changing");
    window.setTimeout(() => {
      answer.textContent = answers[button.dataset.prompt];
      answer.classList.remove("is-changing");
    }, 140);
  });
});

const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");
const emptyState = document.querySelector("#empty-state");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    let visibleCount = 0;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    projects.forEach((project) => {
      const visible = selected === "all" || project.dataset.categories.split(" ").includes(selected);
      project.classList.toggle("is-hidden", !visible);
      if (visible) visibleCount += 1;
    });
    emptyState.hidden = visibleCount > 0;
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
document.querySelector("#year").textContent = new Date().getFullYear();
